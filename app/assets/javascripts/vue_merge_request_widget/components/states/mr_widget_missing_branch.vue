<script>
import { GlIcon, GlTooltipDirective } from '@gitlab/ui';
import { sprintf, s__ } from '~/locale';
import statusIcon from '../mr_widget_status_icon.vue';

export default {
  name: 'MRWidgetMissingBranch',
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  components: {
    GlIcon,
    statusIcon,
  },
  props: {
    mr: {
      type: Object,
      required: true,
    },
  },
  computed: {
    missingBranchName() {
      return this.mr.sourceBranchRemoved ? 'source' : 'target';
    },
    missingBranchNameMessage() {
      return sprintf(
        s__('mrWidget| Please restore it or use a different %{missingBranchName} branch'),
        {
          missingBranchName: this.missingBranchName,
        },
      );
    },
    message() {
      return sprintf(
        s__(
          'mrWidget|If the %{missingBranchName} branch exists in your local repository, you can merge this merge request manually using the command line',
        ),
        {
          missingBranchName: this.missingBranchName,
        },
      );
    },
  },
};
</script>
<template>
  <div class="mr-widget-body media">
    <status-icon :show-disabled-button="true" status="warning" />

    <div class="media-body space-children">
      <span class="bold js-branch-text">
        <span class="capitalize"> {{ missingBranchName }} </span>
        {{ s__('mrWidget|branch does not exist.') }} {{ missingBranchNameMessage }}
        <gl-icon v-gl-tooltip :title="message" :aria-label="message" name="question-o" />
      </span>
    </div>
  </div>
</template>
