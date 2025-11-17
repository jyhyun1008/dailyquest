<template>
  <NuxtLayout>
    <div id="app-wrapper">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style>

@font-face {
    font-family: 'KhnpHandot';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/KHNPHD.woff') format('woff');
    font-weight: normal;
    font-display: swap;
}

* {
  box-sizing: border-box;    
    font-family: 'KhnpHandot';
    color: #330000;

}

body {
  background-color: pink;
  background-image: url('/bg.jpg');
  background-position: center;
  background-size: cover;
  font-size: 18px;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}

#app-wrapper {
  padding: 50px;
}

#parent-wrapper {
  background-color: #ffffffcc;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
}

</style>