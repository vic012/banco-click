# Generated by Django 3.2.6 on 2021-08-16 16:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('banco', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='nome',
            new_name='name',
        ),
    ]
