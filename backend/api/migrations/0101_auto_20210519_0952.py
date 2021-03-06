# Generated by Django 3.0.14 on 2021-05-19 16:52

import db_comments.model_mixins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0100_auto_20210514_1518'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelYearReportLDVSales',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('create_user', models.CharField(default='SYSTEM', max_length=130)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('update_user', models.CharField(max_length=130, null=True)),
                ('ldv_sales', models.IntegerField()),
                ('from_gov', models.BooleanField(default=False)),
                ('model_year', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.ModelYear')),
                ('model_year_report', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.ModelYearReport')),
            ],
            options={
                'db_table': 'model_year_report_ldv_sales',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
        migrations.DeleteModel(
            name='ModelYearReportPreviousSales',
        ),
    ]
