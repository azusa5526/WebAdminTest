<template>
	<svg class="svg-icon" :style="`width: ${width}px; height: ${height}px; fill: ${color}`">
		<use :xlink:href="`#${iconName}`"></use>
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		iconName: {
			type: String,
			required: true
		},

		width: {
			type: Number
		},

		height: {
			type: Number
		},

		color: {
			type: String
		}
	}
};
</script>
