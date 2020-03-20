from django.urls import path

from utils.views import AboutView, ProfileView


urlpatterns = [
	path('about/', AboutView.as_view(), name="about"),
	path('profile/', ProfileView.as_view(), name="profile"),
]
