<script>
/**
 * Dashboard component
 */
export default {
    head() {
        return {
            title: `${this.title} | ThaiPower Admin`,
        };
    },
    data() {
        return {
            title: "Dashboard",
            items: [{
                    text: "Dashboard",
                },
                {
                    text: "Dashboard",
                    active: true,
                },
            ],
        };
    },
    methods: {
        async test() {
            try{
                let response = await this.$axios.get("/api/users");
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
</div>
</template>

<style></style>
