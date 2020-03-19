from django.urls import path

from utils.views import AboutView


urlpatterns = [
	path('about/', AboutView.as_view(), name="about"),
]
