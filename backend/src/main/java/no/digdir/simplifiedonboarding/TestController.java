package no.digdir.simplifiedonboarding;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Collections;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/user")
    public Map<String, Object> getTest(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @GetMapping("/authenticate")
    public void method(HttpServletResponse httpServletResponse) {
        httpServletResponse.setHeader("Location", "http://localhost:3000");
        httpServletResponse.setStatus(302);
    }

}
