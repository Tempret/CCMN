from django.shortcuts import render, HttpResponse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from requests import get, post, Timeout, ConnectionError
from requests.auth import HTTPBasicAuth

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

