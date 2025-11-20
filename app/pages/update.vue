<template>
    <div id="parent-wrapper">
        <div id="point-wrapper">
            <div>내가 가진 포인트 <span class="quest-done"><NuxtLink :to=linkto()>내역</NuxtLink></span></div>
            <div style="font-size: 4rem;">🪙 {{myPoint}}</div>
        </div>
        <div id="quest-wrapper">
            <h2>🌸 내 퀘스트 🌸</h2>
            <textarea v-model="list" id="quest-list" />
            <div class="button-flex">
                <span class="quest-button"><NuxtLink to="https://quest.howeverina.studio/">돌아가기</NuxtLink></span>
                <span class="quest-button" v-on:click="sendListNote(list)">수정완료</span>
            </div>
            <h2>🌸 미리보기 🌸</h2>
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
                        <div class="quest-done">완료</div>
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
var list = ''

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

const sendListNote = async function (text) {
    
    await $fetch(`https://${localStorage.getItem('host')}/api/notes/create`, {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `${username.value}의 #dailyquest 예요!\n#${username.value}_dq_list\n\`\`\`\n${text}\n\`\`\``,
            visibility: 'specified'
        }),
    })

    location.href="https://quest.howeverina.studio/";
}

onMounted(async () => {

accessToken.value = localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):route.query.at?route.query.at:''

if (!accessToken) {
    // 토큰이 없으면 요청을 보내지 않고 상태를 업데이트합니다.
    error.value = new Error('URL에 accessToken이 없습니다.');
    pending.value = false;
    return;
  }

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
list = questListValue?questListValue.join('\n'):'카테고리\n- 항목1: 100포인트'

document.querySelector('#quest-list').addEventListener('input', (e)=>{
    console.log('dd')
    questList.value = e.target.value.split('\n')
})

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

</style>