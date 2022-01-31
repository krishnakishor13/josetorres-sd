from django.contrib import admin
from .models import User

@admin.register(User)
class UserModel(admin.ModelAdmin):
    fields = ['name', 'email', 'profile', 'token', 'token_expires']
    list_filter = []
    list_display = fields
    search_fields = ['name', 'email']