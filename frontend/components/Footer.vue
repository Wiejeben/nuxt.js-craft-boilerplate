<template>
    <footer>
        <p>
            Address: {{ location.address }}<br>
            Place: {{ location.place }}<br>
            Postal Code: {{ location.postalCode }}<br>
            Phone Number: {{ location.phoneNumber }}
        </p>
    </footer>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                location: state => state.globals.location,
            })
        }
    }
</script>
