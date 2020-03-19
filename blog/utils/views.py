from django.views.generic import TemplateView


class AboutView(TemplateView):
	template_name = 'utils/about.html'
