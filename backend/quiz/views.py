from rest_framework import generics, permissions
from .models import QuizSession
from .serializers import QuizSessionSerializer

class QuizSessionCreateView(generics.CreateAPIView):
    serializer_class = QuizSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class QuizSessionListView(generics.ListAPIView):
    serializer_class = QuizSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuizSession.objects.filter(user=self.request.user).order_by('-date_played')
