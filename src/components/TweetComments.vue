<template>
    <section>
        <div id="gridWrapper">
            <div>
                <img class="avatar" src="@/assets/defaultProfile.png" alt="">
            </div>
            <div>
                {{ content }} 
            </div>
            <div>
                {{ username }} - {{ createdAt }}
            </div>
        </div>
        
    </section>
</template>

<script>
    export default {
        name : 'TweetComments',
        props: {
            commentId : Number,
            tweetId : Number,
            username : String,
            content : String,
            createdAt : String,
        }
    }
</script>

<style lang="scss" scoped>
    #gridWrapper {
        display: grid;
        grid-template-columns: .2fr .8fr;
        grid-template-rows: 1fr 1fr;
        height: 60px;
        
        div {
            padding-left: 50px;
        }
        div:nth-child(1) {
            position: relative;
            padding-left: 18px;
            grid-row: 1/3;
            border-right: 1px solid grey;
        }
        div:nth-child(2) {
            font-size: 1.3rem;
        }
        div:nth-child(3) {
            font-size: 0.9rem;
            color: rgb(150, 146, 146);
        }
    }
    div > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .avatar {
        height: 30px;
    }

</style>