from django.urls import path
from .views import QuizSessionCreateView, QuizSessionListView

urlpatterns = [
    path('quiz/sessions/create/', QuizSessionCreateView.as_view(), name='quiz-create'),
    path('quiz/sessions/', QuizSessionListView.as_view(), name='quiz-history'),
]

