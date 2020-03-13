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
	fixtures = ('posts', 'post_contents')
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

	def test_post_add_new_content_to_the_top(self):
		post_id = 1
		content = PostContent.objects.create(headline='first content', post_id=post_id, order=0)

		new_content = {
			"text": "new content text",
			"headline": "new content headline",
			"ref": "1234-AED3AED3-4123AED3",
			"post_id": post_id
		}
		data = {
			"create": [new_content],
			"delete": [],
			"update": [],
			"ordering": {"1234-AED3AED3-4123AED3": 0, content.id: 1}
		}	

		url = reverse('posts:contents_detail', args=[post_id], subdomain='api')
		response = self.client.post(url, data, format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		contents = PostContent.objects.filter(post_id=post_id).order_by('order')
		self.assertEqual(contents.count(), 2)
		self.assertEqual(contents[0].text, new_content['text'])
		self.assertEqual(contents[0].headline, new_content['headline'])
		self.assertEqual(contents[0].order, 0)
		self.assertEqual(contents[1].headline, 'first content')
		self.assertEqual(contents[1].order, 1)

	def test_post_delete_middle_content_add_new_at_the_end(self):
		post_id = 2

		new_content = {
			"text": "new content text",
			"headline": "new content headline",
			"ref": "1234-AED3AED3-4123AED3",
			"post_id": post_id,
			"order": 1
		}
		# Delete two middle contents
		# Create new headline in the middle
		# Swap first content with last one
		data = {
			"create": [new_content],
			"delete": [3, 2],
			"update": [{
				"id": 1,
				"headline": "new first headline",
				"order": 2,
				"post_id": post_id
			}],
			"ordering": {
				1: 2,
				"1234-AED3AED3-4123AED3": 1,
				4: 0
			}
		}	

		url = reverse('posts:contents_detail', args=[post_id], subdomain='api')
		response = self.client.post(url, data, format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		contents = PostContent.objects.filter(post_id=post_id).order_by('order')
		self.assertEqual(contents.count(), 3)
		self.assertEqual(contents[0].headline, "fourth headline")
		self.assertEqual(contents[0].order, 0)
		self.assertEqual(contents[1].headline, "new content headline")
		self.assertEqual(contents[1].order, 1)
		self.assertEqual(contents[2].headline, "new first headline")
		self.assertEqual(contents[2].order, 2)