# Generated by Django 3.0.3 on 2020-09-03 21:11

import db_comments.model_mixins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0070_auto_20200903_1142'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='credittransfer',
            name='credit_class',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='from_supplier',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='model_year',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='number_of_credits',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='to_supplier',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='total_value',
        ),
        migrations.RemoveField(
            model_name='credittransfer',
            name='value_per_credit',
        ),
        migrations.CreateModel(
            name='CreditTransferContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('create_user', models.CharField(default='SYSTEM', max_length=130)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('update_user', models.CharField(max_length=130, null=True)),
                ('credit_transaction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='credit_transaction', to='api.CreditTransaction')),
                ('credit_transfer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='credit_transfer_content', to='api.CreditTransfer')),
            ],
            options={
                'db_table': 'credit_transfer_content',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
    ]
