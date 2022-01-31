from apps.users.models import User
from django.db import models
from apps.category.models import Category
from config.constants import *
from django.core.validators import MinValueValidator

class Transaction(models.Model):
    class Meta(object):
        db_table = 'transaction'

    name = models.CharField(
        'Name', blank=False, null=False, max_length=200
    )
    user = models.ForeignKey(
        User, related_name='related_user', on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, related_name='related_category', on_delete=models.CASCADE
    )
    type = models.CharField(
        'Type', blank=False, null=False, max_length=50, choices=TRANSACTION_TYPE
    )
    amount = models.IntegerField(
        'Amount', blank=False, null=False, validators=[
            MinValueValidator(1)
        ]
    )
    date = models.DateField(
        'Date', blank=False, null=False
    )
    created_at = models.DateTimeField(
        'Creation Date', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Update Date', blank=True, auto_now=True
    )