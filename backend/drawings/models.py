from django.db import models
from django.contrib.auth.models import User

class Shape(models.Model):
    SHAPE_TYPES = [
        ('rectangle', 'Rectangle'),
        ('circle', 'Circle'),
        ('star', 'Star'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    shape_type = models.CharField(max_length=10, choices=SHAPE_TYPES, null=True, blank=True)
    geometry = models.JSONField(null=True, blank=True)  # Store the geometry as JSON
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.shape_type} - {self.created_at}" if self.user else f"Anonymous - {self.shape_type} - {self.created_at}"
