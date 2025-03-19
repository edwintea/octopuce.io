module.exports.tiktok={
    "AppId"         :   "7309838765614548998",
    "ClientKey"     :   "aw49nd8wdkwbs5ro",
    "ClientSecret"  :   "ZbGyswjOKDe2fAkZFCl52WakFNYpkJWg",
    "redirectUrl"   :   "http://localhost:3000/chanel/callback/tiktok",
    "callbackUrl"   :   "https://app.octopuce.io/chanel/callback/tiktok",
    "url"       :   {
        "authorization" :   "https://www.tiktok.com/v2/auth/authorize/",
        "token"         :   "https://open.tiktokapis.com/v2/oauth/token/",
    },
    grant_type          :   {
        "auth"          :   "authorization_code",
        "refresh_token" :   "refresh_token"
    },
    //scopes           :   'user.info.basic,video.publish,video.upload,video.list'//deleimiter with comma
    scopes           :   'user.info.basic'//deleimiter with comma
}

module.exports.pinterest={
    "AppId"         :   "1493687",//client_id
    "AppKey"        :   "f091f906fe5b24443d825d569d8944a7877fa434",  
    "redirectUrl"   :   "https://app.octopuce.io/chanel/callback/pinterest",//https://app.octopuce.io/chanel/callback/pinterest
    "callbackUrl"   :   "https://app.octopuce.io/chanel/callback/pinterest",
    "url"   :   {
        "authorization" :   "https://www.pinterest.com/oauth/",
        "token"         :   "https://api.pinterest.com/v5/oauth/token",
    },
    scopes              : "boards:read,boards:write,pins:read,pins:write",
    grant_type          :   {
        "auth"          :   "authorization_code",
        "refresh_token" :   "refresh_token"
    }
}
module.exports.dropbox={
    "App_key"         :   "abpjnhedf7odq9c",
    "App_secret"      :   "skki94cilsw23qp",
    "redirectUrl"   :   "https://app.octopuce.io/chanel/callback/dropbox",//http://localhost:3000/chanel/callback/dropbox
    "callbackUrl"   :   "https://app.octopuce.io/chanel/callback/dropbox",
    "url"   :   {
        "authorization" :   "https://www.dropbox.com/oauth2/authorize",
        "token"         :   "https://api.dropbox.com/oauth2/token",
    },
    scopes              : "account_info.read account_info.write files.content.read files.content.write",
    grant_type          :   {
        "auth"          :   "authorization_code",
        "refresh_token" :   "refresh_token"
    }
}

module.exports.linkedin={
    "ClientId"         :   "78vdm88km0fg56",
    "ClientSecret"     :   "PR1j59cFKdk41PCT",
    "redirectUrl"   :   "https://app.octopuce.io/chanel/callback/linkedin",
    "callbackUrl"   :   "https://app.octopuce.io/chanel/callback/linkedin",
    "url"   :   {
        "authorization" :   "https://www.linkedin.com/oauth/v2/authorization",//https://www.linkedin.com/oauth/v2/authorization
        "token"    :   "https://www.linkedin.com/oauth/v2/accessToken",
    },
    scopes              : "openid profile w_member_social email",
    grant_type          :   {
        "auth"          :   "authorization_code",
        "refresh_token" :   "refresh_token"
    }

}


module.exports.facebook={ 
    "app_id"            :   "1541327403295745",
    "token"             :   "EAAV51EBbJAEBO9IpAHXZBSCXs2xkjV39rFzJwRnCGQ8URSTZCOBFZBRx5owsi1BZCdiXVTDyD03lkNZAfvvPTllyceMZCC1OIfB6YzmQWnwSllHXMZByx0LZAzUx1hZA5NXuqB3iZCpRXiB7F5l8sviTa6f0cIJZBt47YFCDpryZBN3bupWnKCQP2mZBZBp6u1yai87fWjiQhq2jEJb77EMDzzm2DYlpfZCZB8OelDBM0nCE9jUVfeh5bJVSQtxv8NLaA9nmFAZDZD",
    "ClientId"         :   "1541327403295745",
    "ClientSecret"     :   "4fca9cf285c5d0011724745f78684991",
    "ClientToken"       :   "afbeb5fa904a40a4495573c1b083e763",
    "AppToken"          :   "1541327403295745|brYrO5rJ2la4zkmSf5OiOOjJUOs", //see url.app_token to generate
    "url"   :{
        "callback"      :   "https://app.octopuce.io/chanel/callback/facebook",
        "app_token"      :   "https://graph.facebook.com/oauth/access_token?client_id=1541327403295745&client_secret=4fca9cf285c5d0011724745f78684991&grant_type=client_credentials"
    }

}

module.exports.instagram={ 
    "app_id"            :   "183850421458605",
    "app_secret"        :   "f39ee0df23a7cc1e01e95374fb7f4c69",
    "ClientId"         :   "183850421458605",
    "ClientToken"       :   "7e369e044eccb8202ed0c01b0bd08281",
    "token"             :   "7fc7cbef4e359a8861b51820a8867624",
    "redirectUrl"   :   "https://app.octopuce.io/chanel/callback/instagram",
    "callbackUrl"   :   "https://app.octopuce.io/chanel/callback/instagram",
    "url"   :   {
        "authorization" :   "https://api.instagram.com/oauth/authorize",
        "token"    :   "https://api.instagram.com/oauth/access_token",
    },
    scopes              : "user_profile,user_media",
    grant_type          :   {
        "auth"          :   "authorization_code",
        "refresh_token" :   "refresh_token"
    }
}

module.exports.snapchat={
    "ClientId"         :   "",
    "ClientSecret"     :   "",

}

module.exports.youtube={
    "ClientId"         :   "",
    "ClientSecret"     :   "",

}




module.exports.drive={
    "ClientId"         :   "",
    "ClientSecret"     :   "",

}