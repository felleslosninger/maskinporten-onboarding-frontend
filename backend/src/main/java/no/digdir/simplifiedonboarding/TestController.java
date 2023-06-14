package no.digdir.simplifiedonboarding;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.mvc.ProxyExchange;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
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

    @Autowired
    private OAuth2AuthorizedClientManager authorizedClientManager;

    @GetMapping("/datasharing/**")
    public ResponseEntity<?> proxyPath(ProxyExchange<byte[]> proxy, Authentication authentication,
                                       HttpServletRequest servletRequest,
                                       HttpServletResponse servletResponse) {
        OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId("ansattporten")
                .principal(authentication)
                .attributes(attrs -> {
                    attrs.put(HttpServletRequest.class.getName(), servletRequest);
                    attrs.put(HttpServletResponse.class.getName(), servletResponse);
                })
                .build();
        OAuth2AuthorizedClient authorizedClient = this.authorizedClientManager.authorize(authorizeRequest);

        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();


        return proxy.uri("http://localhost:9090" + proxy.path())
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken.getTokenValue())
                .get();
    }

}
