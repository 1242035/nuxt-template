<template>
    <h1>
      Edit
    </h1>
</template>

<script>
export default {
    middleware: 'auth',
    layout: 'edit',
    head() {
        return {
            title: "Edit",
            meta: [
                { hid: 'description', name: 'description', content: "description..."},
                { hid: 'keywords', name: 'keywords', content: 'keywords'}
            ]
        }
    }
}
</script>
