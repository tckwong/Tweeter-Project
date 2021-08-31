<template>
    <div>
        {{ username }} | {{ content }} | {{ createdAt }}
    </div>
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

</style>