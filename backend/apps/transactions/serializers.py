from apps.users.serializers import UserSerializer
from .models import Transaction
from rest_framework import serializers


class TransactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transaction
        fields = '__all__'

    def validate(self, data):
        errors = {}
        if 'name' not in data or not data['name']:
            errors['name'] = ['name is required.']

        if 'category' not in data or not data['category']:
            errors['category'] = ['category is required.']

        if 'amount' not in data:
            errors['amount'] = ['amount is required.']

        if 'date' not in data or not data['date']:
            errors['date'] = ['date is required.']

        if 'type' not in data or not data['type']:
            errors['type'] = ['type is required.']

        if bool(errors):
            raise serializers.ValidationError(errors)

        return data

class ListTransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'
        depth = 1