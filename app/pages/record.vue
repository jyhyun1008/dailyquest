<template>
    <div id="parent-wrapper">
        <div id="point-wrapper">
            <div>내가 가진 포인트 <span class="quest-done"><NuxtLink :to=linkto(accessToken)>돌아가기</NuxtLink></span></div>
            <div style="font-size: 4rem;">🪙 {{myPoint}}</div>
        </div>
        <div id="quest-wrapper">
            <h2>🌸 내역 🌸</h2>
            <div id="quest-items-wrapper">
                <div class="quest-titles">
                    <div class="quest-item">
                        <div class="quest-title">
                            내역
                        </div>
                        <div class="quest-point">
                            증감
                        </div>
                        <div class="quest-point" v-on:click="sendNote(quest)">최종</div>
                    </div>
                </div>
                <div v-for="record in lastRecords" class="quest-items">
                    <div class="quest-item">
                        <div class="quest-title">
                            {{parseRecordItem(record).title}}
                        </div>
                        <div class="quest-point">
                            {{parseRecordItem(record).point}}
                        </div>
                        <div class="quest-point" v-on:click="sendNote(quest)">{{parseRecordItem(record).final}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app';

const route = useRoute()
const accessToken = route.query.at?route.query.at:''

const i = ref(null);
const username = ref(null);
const lastRecords = ref(null);
let myPoint = ref(null)
const pending = ref(true); // "로딩 중"을 먼저 보여주기 위해 true로 시작
const error = ref(null);

const linkto = function (accessToken) {
    return `/?at=${accessToken}`
}

const parseRecordItem = function (record) {
    let data
    if (record.text.split(' #')[0] == '🌸') {
        data = {
            title: record.text.split('quest 에서 ')[1]?.split('을(를)')[0],
            point: parseInt(record.text.split('을(를) 완료하고')[1]?.split(' 포인트를 벌었어요')[0]),
            final: parseInt(record.text.split('포인트: 🪙 ')[1]?.split('\n')[0])
        }
    } else if (record.text.split(' #')[0] == '🪽') {
        data = {
            title: record.text.split('quest 에서 ')[1]?.split('을(를)')[0],
            point: -1*parseInt(record.text.split('을(를) 목적으로')[1]?.split(' 포인트를 소모했어요')[0]),
            final: parseInt(record.text.split('포인트: 🪙 ')[1]?.split('\n')[0])
        }
    } else {
        data = {title: "", point: 0, final: 0}
    }
    
    return data
}

onMounted(async () => {

if (!accessToken) {
    // 토큰이 없으면 요청을 보내지 않고 상태를 업데이트합니다.
    error.value = new Error('URL에 accessToken이 없습니다.');
    pending.value = false;
    return;
  }

const iValue = await $fetch('https://stella.place/api/i', {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })

username.value = iValue.username
i.value = iValue


let lastRecordsValue = await $fetch('https://stella.place/api/notes/search-by-tag', {
        method: "POST",
        server: false,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tag: `${username.value}_dailyquest`
        }),
    })

lastRecordsValue = lastRecordsValue.filter((record) => record.user.username == username.value)

lastRecords.value = lastRecordsValue

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