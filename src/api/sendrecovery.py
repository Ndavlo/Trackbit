from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

def recovery_password_email(user_email, url_recovery):
    print(user_email)
    message = Mail(
        from_email=os.environ.get('SENDGRID_SENDER'),
        to_emails=user_email,
        subject='Recupera tu acceso a TrackBit',
        html_content='<h1>Recupera tu acceso haciendo click en el siguiente enlace</h1><hr><a href='+ url_recovery +'>Click aqui para continuar</a>')
    return send_mail(message)

def send_mail(message):
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
        return False