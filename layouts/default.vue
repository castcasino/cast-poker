<template>
    <main className="w-screen h-screen overflow-hidden flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header :tableid="tableid" />

        <section className="w-full sm:w-[640px] mx-auto bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            <slot />
        </section>

        <section>
            <Navbar :tableid="tableid" />
            <Footer :tableid="tableid" />
        </section>
    </main>
</template>

<script setup lang="ts">

/* Initialize table ID. */
const tableid = ref<number>(4)

</script>
