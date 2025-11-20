<template>
    <!-- (필수항목) href의 주소가 인증코드의 전송처가 됩니다. -->
    <link rel='redirect_uri' href='/redirect'>

    <!-- 사용자에게 보여줄 앱의 이름입니다. 없으면 이 페이지의 주소가 이름이 됩니다. -->
    <div class='h-app'>
        <NuxtLink to="/" class="u-url p-name">DailyQuest</NuxtLink>
    </div>

    <div id="parent-wrapper">
        <div id="quest-wrapper">
        <h3>서버 주소를 입력해주세요.</h3>
        <input v-model="hostUrl" placeholder="서버 주소"></input>
        <div class="quest-done" v-on:click="fetchServer(hostUrl)">로그인</div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import pkceChallenge from "pkce-challenge";
var hostUrl = ""

const codes = await pkceChallenge(128)

const authorization_endpoint = ref(null)
const token_endpoint = ref(null)
const state = ref(null)
const redirectUri = ref(null)
const clientId = ref(null)
const codeChallenge = codes.code_challenge
const codeVerifier = codes.code_verifier

async function fetchServer(host) {
    const oauthInfo = await $fetch(`https://${host}/.well-known/oauth-authorization-server`)
    console.log(oauthInfo)

    authorization_endpoint.value = oauthInfo.authorization_endpoint
    token_endpoint.value = oauthInfo.token_endpoint
    localStorage.setItem('token_endpoint', token_endpoint.value)
    localStorage.setItem('host', host)
    localStorage.setItem('code_verifier', codeVerifier);

    console.log(`${authorization_endpoint.value}?client_id=${clientId.value}&response_type=code&redirect_uri=${redirectUri.value}&scope=read%3Aaccount%20write%3Anotes%20read%3Areactions&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state.value}`)
    location.href = `${authorization_endpoint.value}?client_id=${clientId.value}&response_type=code&redirect_uri=${redirectUri.value}&scope=read%3Aaccount%20write%3Anotes%20read%3Areactions&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state.value}`
}


onMounted(() => {

console.log(codeVerifier, codeChallenge)

redirectUri.value = encodeURIComponent(`https://quest.howeverina.studio/redirect`)
clientId.value = encodeURIComponent('https://quest.howeverina.studio/login')
state.value = window.crypto.randomUUID();
console.log('state', state.value);

})
</script>

<style>
.h-app {
    width: 100%;
    text-align: center;
}

.h-app a {
    text-decoration: none;
    color: inherit;
}

</style>