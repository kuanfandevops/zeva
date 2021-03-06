# Generated by Django 3.0.7 on 2020-12-28 22:22

import db_comments.model_mixins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0083_auto_20201216_1222'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('create_user', models.CharField(default='SYSTEM', max_length=130)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('update_user', models.CharField(max_length=130, null=True)),
                ('notification_code', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('permission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='api.Permission')),
            ],
            options={
                'db_table': 'notification',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
        migrations.CreateModel(
            name='NotificationSubscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('create_user', models.CharField(default='SYSTEM', max_length=130)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('update_user', models.CharField(max_length=130, null=True)),
                ('notification', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_subscriptions', to='api.Notification')),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_subscriptions', to='api.UserProfile')),
            ],
            options={
                'db_table': 'notification_subscription',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
    ]
