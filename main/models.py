from django.db import models
from django.utils import timezone


class Post(models.Model):
    # author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=16)
    password = models.CharField(max_length=16)
    email = models.CharField(max_length=64)

    def register(self):
        self.save()

    def __str__(self):
        return "Subscriber %s" % self.login
