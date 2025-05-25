from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('L’adresse email est obligatoire.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

class QuizSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_sessions')
    score = models.IntegerField()
    date_played = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.score}/10 - {self.date_played.strftime('%Y-%m-%d %H:%M')}"
