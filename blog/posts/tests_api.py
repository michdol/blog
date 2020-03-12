from django.conf import settings
from django.contrib.sites.models import Site
from rest_framework import status
from rest_framework.test import APITestCase
from subdomains.utils import reverse

from posts.models import Post, PostContent


class SubdomainTestMixin(object):
	DOMAIN = "local"

	@classmethod
	def setUpClass(cls):
		super().setUpClass()
		setattr(settings, 'ALLOWED_HOSTS', '*')

	def setUp(self):
		super().setUp()
		self.site = Site.objects.get(id=getattr(settings, "SITE_ID", 1))
		self.site.domain = self.DOMAIN
		self.site.name = self.DOMAIN
		self.site.save()

	def get_host_for_subdomain(self, subdomain=None):
		host = self.site.domain
		if subdomain:
			host = '%s.%s' % (subdomain, self.DOMAIN)
		return host


class SubdomainApiTestCase(SubdomainTestMixin, APITestCase):
	def setUp(self):
		super().setUp()
		host = self.get_host_for_subdomain("api")
		self.client.defaults.update({
			"HTTP_HOST": host
		})


class PostContentsDetailTest(SubdomainApiTestCase):
	fixtures = ('posts',)
	"""
	data = {
		"create": [],
		"delete": [],
		"update": [],
		"ordering": {}
	}
	"""

	def test_post_new_post(self):
		post = Post.objects.create(title="test")
		data = {
			"create": [],
			"delete": [],
			"update": [],
			"ordering": {}
		}

		url = reverse('posts:contents_detail', args=[post.id], subdomain='api')
		response = self.client.post(url, data, format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		qs = PostContent.objects.filter(post_id=post.id)
		self.assertEqual(qs.count(), 0)

	def test_post_new_post_create_contents(self):
		post = Post.objects.get(id=1)
		new_content = {
			"text": "new content text",
			"headline": "new content headline",
			"ref": "1234-AED3AED3-4123AED3"
		}
		data = {
			"create": [new_content],
			"delete": [],
			"update": [],
			"ordering": {"1234-AED3AED3-4123AED3": 0}
		}

		url = reverse('posts:contents_detail', args=[post.id], subdomain='api')
		response = self.client.post(url, data, format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		qs = PostContent.objects.filter(post_id=post.id)
		self.assertEqual(qs.count(), 1)
		content = qs.first()
		self.assertEqual(content.text, new_content['text'])
		self.assertEqual(content.headline, new_content['headline'])
		self.assertEqual(content.order, 0)
