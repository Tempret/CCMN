"""CCMN URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^index$', views.index, name='index'),
    url(r'^get_table_total_visitors/$', views.get_table_total_visitors, name='get_table_total_visitors'),
    url(r'^get_hourly_total_visitors/$', views.get_hourly_total_visitors, name='get_hourly_total_visitors'),
    url(r'^get_active_users_list/$', views.get_active_users_list, name='get_active_users_list'),
    url(r'^get_map_and_coords/$', views.get_map_and_coords, name='get_map_and_coords'),
    url(r'^get_dwell_and_repeat_data/$', views.get_dwell_and_repeat_data, name='get_dwell_and_repeat_data'),
    url(r'^get_manufacturers/$', views.get_manufacturers, name='get_manufacturers'),
]