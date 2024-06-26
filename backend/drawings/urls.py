from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShapeViewSet

router = DefaultRouter()
router.register(r'shapes', ShapeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
