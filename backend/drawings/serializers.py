from rest_framework import serializers
from .models import Shape

class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ['id', 'user', 'shape_type', 'geometry', 'created_at']
