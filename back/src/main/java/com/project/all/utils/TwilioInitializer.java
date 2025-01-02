package com.project.all.utils;

import com.twilio.Twilio;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class TwilioInitializer {
    @Value("${account.sid}")
    private String accountSid;
    @Value("${auth.token}")
    private String authToken;

    public TwilioInitializer() {
        System.out.println(accountSid + authToken);
      //  Twilio.init(accountSid,authToken);
        System.out.println("twilio intialized with account: "+accountSid);
    }
}
