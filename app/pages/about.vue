<template>
    <!-- (필수항목) href의 주소가 인증코드의 전송처가 됩니다. -->
    <link rel='redirect_uri' href='/redirect'>

    <!-- 사용자에게 보여줄 앱의 이름입니다. 없으면 이 페이지의 주소가 이름이 됩니다. -->
    

    <div id="parent-wrapper">
        <div id="quest-wrapper">
            <h1>DailyQuest 소개</h1>
            <div class="quest-text">DailyQuest는 ADHD 당사자가 직접 사용하기 위해 만든, 태스크를 즉각적인 보상으로 전환하며, 금전 지출을 제한하는 동기부여를 제공하는 웹앱입니다. ADHD 당사자들을 대상으로 하지만, 의학적인 근거는 없습니다.</div>
            <h2>Misskey 기반</h2>
            <div class="quest-text">DailyQuest는 <NuxtLink to="https://misskey-hub.net/ko/">Misskey</NuxtLink>의 노트와 연동됩니다. 본 웹사이트는 별도의 데이터베이스 서버를 운영하지 않으며, 모든 정보는 자신의 Misskey 계정에 노트로 저장됩니다.</div>
            <div class="quest-text">따라서, #dailyquest 태그가 달린 노트를 지우면 본 페이지에서의 기록도 함께 지워지게 되니, 노트를 청소하실 때 유의해 주세요.</div>
            <h2>이런 분에게 추천드려요</h2>
            <div class="quest-text">
                <ul>
                    <li>해야할 잡다한 일에 대한 즉각적인 보상이 없어서 동기부여가 잘 안 되는 사람들</li>
                    <li>지출할 수 있는 금액의 상한선을 설정해냥 하는 사람들</li>
                </ul>
            </div>
            <div class="button-flex">
                <span class="quest-button"><NuxtLink to="https://quest.howeverina.studio/">돌아가기</NuxtLink></span>
            </div>
        </div>
    </div>

</template>

<script setup>

</script>

<style>
.quest-text {
    text-align: left;
    line-height: 1.8;
    width: 100%;
    margin-bottom: 0.5rem;
}

.quest-text a {
    text-decoration: none;
    color: pink;
}

</style>