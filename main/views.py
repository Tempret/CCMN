from django.shortcuts import render, HttpResponse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from requests import get, post, Timeout, ConnectionError
from requests.auth import HTTPBasicAuth
from base64 import b64encode

def index(request):
	return render(request, 'base.html', locals())

def get_table_total_visitors(request):
	if request.method == 'POST':

		when = request.POST['when']
		login = request.POST['login']
		password = request.POST['pass']
		siteid = request.POST['site_id']

		args = {
			'siteId': siteid,
		}

		if when == 'custom':
			args['date'] = request.POST['date']
			when = ''


		print(when, login, password, siteid)

		url1 = 'https://cisco-presence.unit.ua/api/presence/v1/connected/count/' + when
		url2 = 'https://cisco-presence.unit.ua/api/presence/v1/passerby/count/' + when
		url3 = 'https://cisco-presence.unit.ua/api/presence/v1/visitor/count/' + when

		auth = HTTPBasicAuth(login, password)

		try:
			response1 = get(url1, auth=auth, params=args, verify=False, timeout=1)
			response2 = get(url2, auth=auth, params=args, verify=False, timeout=1)
			response3 = get(url3, auth=auth, params=args, verify=False, timeout=1)

		except (Timeout, ConnectionError) as err:
			print(err)
			return JsonResponse({'err': err}, safe=False)

		else:
			if 'CMX: System error' in response1.text:
				return JsonResponse({'err': 'Autorisation failed'}, safe=False)

			response_d = {
				'connected': response1.text,
				'passerby': response2.text,
				'visitor': response3.text,
			}
			return JsonResponse(response_d, safe=False)
	else:
		return JsonResponse({'err': 'Method should be POST'}, safe=False)

def get_hourly_total_visitors(request):
	if request.method == 'POST':

		when = request.POST['when']
		login = request.POST['login']
		password = request.POST['pass']
		siteid = request.POST['site_id']

		args = {
			'siteId': siteid,
		}

		if when == 'custom':
			args['date'] = request.POST['date']
			when = ''

		print(when, login, password, siteid)

		url1 = 'https://cisco-presence.unit.ua/api/presence/v1/connected/hourly/' + when
		url2 = 'https://cisco-presence.unit.ua/api/presence/v1/passerby/hourly/' + when
		url3 = 'https://cisco-presence.unit.ua/api/presence/v1/visitor/hourly/' + when

		auth = HTTPBasicAuth(login, password)

		try:
			response1 = get(url1, auth=auth, params=args, verify=False, timeout=1)
			response2 = get(url2, auth=auth, params=args, verify=False, timeout=1)
			response3 = get(url3, auth=auth, params=args, verify=False, timeout=1)

		except (Timeout, ConnectionError) as err:
			print(err)
			return JsonResponse({'err': err}, safe=False)

		else:
			if 'CMX: System error' in response1.text:
				return JsonResponse({'err': 'Autorisation failed'}, safe=False)

			response_d = {
				'connected': response1.text,
				'passerby': response2.text,
				'visitor': response3.text,
			}
			return JsonResponse(response_d, safe=False)
	else:
		return JsonResponse({'err': 'Method should be POST'}, safe=False)

def get_active_users_list(request):
	if request.method == 'POST':
		login = request.POST['login']
		password = request.POST['pass']

		auth = HTTPBasicAuth(login, password)

		url = 'https://cisco-cmx.unit.ua/api/location/v2/clients'

		try:
			response = get(url, auth=auth, verify=False, timeout=1)

		except (Timeout, ConnectionError) as err:
			print(err)
			return JsonResponse({'err': err}, safe=False)

		else:
			if 'CMX: System error' in response.text:
				return JsonResponse({'err': 'Autorisation failed'}, safe=False)

			return JsonResponse(response.text, safe=False)

	else:
		return JsonResponse({'err': 'Method should be POST'}, safe=False)

def get_map_and_coords(request):
	if request.method == 'POST':
		login = request.POST['login']
		password = request.POST['pass']
		mac = request.POST['mac']

		auth = HTTPBasicAuth(login, password)

		url = 'https://cisco-cmx.unit.ua/api/location/v2/clients'


		try:
			response = get(url, auth=auth, verify=False, timeout=1)

		except (Timeout, ConnectionError) as err:
			print(err)
			return JsonResponse({'err': err}, safe=False)

		else:
			if 'CMX: System error' in response.text:
				return JsonResponse({'err': 'Autorisation failed'}, safe=False)

			data = []

			for element in response.json():
				if element['macAddress'] == mac:
					data = element

			if data:

				url = 'https://cisco-cmx.unit.ua/api/config/v1/maps/imagesource/' + data['mapInfo']['image']['imageName']

				try:
					response = get(url, auth=auth, verify=False, timeout=1, stream=True)

				except (Timeout, ConnectionError) as err:
					print(err)
					return JsonResponse({'err': err}, safe=False)

				else:

					floor = data['mapInfo']['mapHierarchyString'].split('>')[-1]

					if floor == '1stFloor' or floor == 'First_floor':
						data['floorNumber'] = 'First floor'
					elif floor == '2nd_floor':
						data['floorNumber'] = 'Second floor'
					elif floor == '3rd_floor':
						data['floorNumber'] = 'Third floor'

					with open('./static/static/media/floors/'+ floor + '.jpg', 'wb') as f:
						for elem in response.iter_content(1024):
							f.write(elem)

					data['mapSrc'] = 'static/media/floors/'+ floor + '.jpg'

				return JsonResponse(data, safe=False)
			else:
				return JsonResponse({'err': 'Unknown mac address'}, safe=False)
	else:
		return JsonResponse({'err': 'Method should be POST'}, safe=False)