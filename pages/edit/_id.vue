<template>
    <h1>
        ID
    </h1>
</template>

<script>
    export default {
        layout: 'edit',
        head() {
            return {
                title: "title",
                meta: [
                    { hid: 'description', name: 'description', content: 'description'},
                    { hid: 'keywords', name: 'keywords', content: 'keywords'}
                ]
            }
        }
    }
</script>
