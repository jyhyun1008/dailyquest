<template>
    <div id="parent-wrapper">
        <div id="point-wrapper">
            <div>내가 가진 포인트:</div>
            <div style="font-size: 4rem;">🪙 3222</div>
        </div>
        <div id="out-wrapper">
            <div id="out-items-wrapper">
                <div class="quest-category">
                    <h3>출금하기</h3>
                </div>
                <div class="quest-item">
                    <div class="quest-title">
                        항목
                    </div>
                    <div class="quest-point">
                        금액
                    </div>
                    <div class="quest-done">출금</div>
                </div>
            </div>
        </div>
        <div id="quest-wrapper">
            <h2>🌸 내 퀘스트 🌸</h2>
            <div id="quest-items-wrapper">
                <div class="quest-category">
                    <h3>청소하기</h3>
                </div>
                <div class="quest-item">
                    <div class="quest-title">
                        바닥쓸기
                    </div>
                    <div class="quest-point">
                        20
                    </div>
                    <div class="quest-done">완료</div>
                </div>
                <div class="quest-item">
                    <div class="quest-title">
                        환기시키기
                    </div>
                    <div class="quest-point">
                        40
                    </div>
                    <div class="quest-done">완료</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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