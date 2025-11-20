<template>
    <div id="parent-wrapper">
        <div id="point-wrapper">
            <div>내가 가진 포인트 <span class="quest-done"><NuxtLink :to=linkto()>내역</NuxtLink></span></div>
            <div style="font-size: 4rem;">🪙 {{myPoint}}</div>
        </div>
        <div id="out-wrapper">
            <div id="out-items-wrapper">
                <div class="quest-category">
                    <h3>소모하기</h3>
                </div>
                <div class="quest-item">
                    <input v-model="title" class="quest-title" placeholder="항목"/>
                    <input v-model="spendPoint" class="quest-point" placeholder="금액"/>
                    <div class="quest-done" v-on:click="spendNote(title, spendPoint)">소모</div>
                </div>
            </div>
        </div>
        <div id="quest-wrapper">
            <h2>🌸 내 퀘스트 🌸</h2>
            <div class="button-flex">
                <span class="quest-button"><NuxtLink to="/about/">소개</NuxtLink></span>
                <span class="quest-button"><NuxtLink to="/update/">목록 수정하기</NuxtLink></span>
                <span class="quest-button" v-on:click="logOut()">로그아웃</span>
            </div>
            <div id="quest-items-wrapper">
                <div v-for="quest in questList" class="quest-items">
                    <div v-if="quest[0] !== '-'" class="quest-category">
                        <h3>{{quest}}</h3>
                    </div>
                    <div v-else class="quest-item">
                        <div class="quest-title">
                            {{parseQuestItem(quest).title}}
                        </div>
                        <div class="quest-point">
                            {{parseQuestItem(quest).point}}
                        </div>
                        <div class="quest-done" v-on:click="sendNote(quest)">완료</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';

const i = ref(null);
const username = ref(null);
const questList = ref(null);
const lastRecords = ref(null);
const myPoint = ref(null)
const pending = ref(true); // "로딩 중"을 먼저 보여주기 위해 true로 시작
const error = ref(null);

const route = useRoute()
var title = ''
var spendPoint = 0

const accessToken = ref(null)

const linkto = function () {
    return '/record/'
}

const parseQuestItem = function (quest) {
    const data = {
        title: quest.split('- ')[1]?.split(':')[0],
        point: parseInt(quest.split(': ')[1]?.split('포인트')[0])
    }
    return data
}


const sendNote = async function (quest) {
    
    await $fetch(`https://${localStorage.getItem('host')}/api/notes/create`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `🌸 #dailyquest 에서 ${parseQuestItem(quest).title} 을(를) 완료하고 ${parseQuestItem(quest).point} 포인트를 벌었어요!\n소지 포인트: 🪙 ${myPoint.value + parseQuestItem(quest).point}\n#${username.value}_dailyquest`,
            visibility: 'followers'
        }),
    })

    reloadNuxtApp();
}

const logOut = function() {
    if (window.confirm("로그아웃하시겠습니까?")) {
        
        localStorage.clear()
        location.href="https://quest.howeverina.studio/login"
    }
}

const spendNote = async function (title, point) {
    
    await $fetch(`https://${localStorage.getItem('host')}/api/notes/create`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `🪽 #dailyquest 에서 ${title} 을(를) 목적으로 ${point} 포인트를 소모했어요!\n소지 포인트: 🪙 ${myPoint.value - point}\n#${username.value}_dailyquest`,
            visibility: 'followers'
        }),
    })

    reloadNuxtApp();
}

onMounted(async () => {

accessToken.value = localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):route.query.at?route.query.at:''

if (!localStorage.getItem('host')) {
    // 토큰이 없으면 요청을 보내지 않고 상태를 업데이트합니다.
    error.value = new Error('URL에 accessToken이 없습니다.');
    pending.value = false;
    location.href="https://quest.howeverina.studio/login/"
} else {

const iValue = await $fetch(`https://${localStorage.getItem('host')}/api/i`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })

username.value = iValue.username
i.value = iValue

const lastNotesValue = await $fetch(`https://${localStorage.getItem('host')}/api/notes/search-by-tag`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tag: `${username.value}_dq_list`
        }),
    })

const questRaw = lastNotesValue[0]?.text.split('```\n')[1]?.split('\n```')[0]
const questListValue = questRaw?.split('\n')

questList.value = questListValue


let lastRecordsValue = await $fetch(`https://${localStorage.getItem('host')}/api/notes/search-by-tag`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tag: `${username.value}_dailyquest`
        }),
    })

lastRecordsValue = lastRecordsValue.filter((record) => record.user.username == username.value)

lastRecords.value = lastRecordsValue

myPoint.value = 0
if (lastRecordsValue.length !== 0) {
    myPoint.value = parseInt(lastRecordsValue[0].text.split('포인트: 🪙 ')[1].split('\n')[0])
}
}

})

</script>

<style>

#point-wrapper, #quest-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

#quest-items-wrapper, #out-items-wrapper {
    width: 100%;
    border-radius: 15px;
    padding: 10px;
    border: 1px solid #00000022;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.quest-items {
    width: 100%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#quest-wrapper, #out-wrapper {
    width: 100%;
    text-align: center;
}

.quest-category {
    width: 100%;
    text-align: center;
    background-color: pink;
    border-radius: 10px;
}

.quest-item {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #00000022;
}

.quest-title {
    flex-grow: 1;
    text-align: left;
}

.quest-point {
    width: 4rem;
}

.quest-done {
    width: 4rem;
    padding: 7px;
    background-color: pink;
    border-radius: 7px;
}

.quest-button {
    padding: 7px;
    background-color: pink;
    border-radius: 7px;
}

</style>