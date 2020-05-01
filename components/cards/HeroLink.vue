<template>
  <div class="HeroLink">
    <h3 class="HeroLink-heading">
      <v-icon size="24" class="HeroLink-heading-icon">
        mdi-information
      </v-icon>
      <nuxt-link class="link" to="/support/01_01/">
        {{ $t('新型コロナウィルス感染症に関する支援制度') }}
      </nuxt-link>
    </h3>
    <p class="HeroLink-body">
      {{
        $t(
          '新型コロナウィルス感染症での困窮に対する公的な支援ついて案内しています。'
        )
      }}
    </p>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    isInternalLink(path) {
      return !/^https?:\/\//.test(path)
    }
  }
}
</script>

<style lang="scss">
.HeroLink {
  @include card-container();
  padding: 10px;
  margin-bottom: 20px;

  & .HeroLink-body {
    margin-left: 1px;
  }
}

.HeroLink-heading {
  display: flex;
  align-items: center;
  @include card-h2();
  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  & .link {
    color: #1297cc;
    text-decoration: none;
  }

  &-icon {
    margin: 3px;
  }
}
</style>
