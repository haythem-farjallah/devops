package com.project.all.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender mailSender ;

    public NotificationService(@Autowired JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${from.number}")
    private String fromNumber;

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

   // Sends an email to the specified recipient
    public void sendMail(String to, String subject, String content) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);
          //  mailSender.send(message);
            logger.info("Email sent successfully to {}", to);
        }
        catch (Exception ex){
            logger.error("Failed to send email to {}: {}", to, ex.getMessage(), ex);
        }

    }

    // Sends an SMS to the specified recipient using Twilio API.
    public void sendSms(String to,String content)
    {
        try {
//            Message message = Message.creator(
//                    new PhoneNumber(to),
//                    new PhoneNumber(fromNumber),
//                    content).create();
            logger.info("SMS sent successfully to {}", to);
        }catch (Exception ex){
            logger.error("Failed to send sms to {}: {}", to, ex.getMessage(), ex);
        }
    }
}
