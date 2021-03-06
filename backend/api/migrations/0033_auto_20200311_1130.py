# Generated by Django 3.0.3 on 2020-03-11 18:30

import db_comments.model_mixins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_auto_20200316_2107'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vehiclechangehistory',
            old_name='vehicle_fuel_type_id',
            new_name='vehicle_zev_type_id',
        ),
        migrations.CreateModel(
            name='ZevType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('effective_date', models.DateField(blank=True, null=True)),
                ('expiration_date', models.DateField(blank=True, null=True)),
                ('description', models.CharField(db_column='description', max_length=250)),
                ('vehicle_zev_code', models.CharField(max_length=4, unique=True)),
                ('create_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api_zevtype_CREATE_USER', to='api.UserProfile')),
                ('update_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api_zevtype_UPDATE_USER', to='api.UserProfile')),
            ],
            options={
                'db_table': 'vehicle_zev_type',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='vehicle_zev_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='api.ZevType'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='vehicle',
            unique_together={('make', 'model_name', 'vehicle_class_code', 'vehicle_zev_type', 'model_year')},
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='vehicle_fuel_type',
        ),
        migrations.DeleteModel(
            name='FuelType',
        ),
    ]
