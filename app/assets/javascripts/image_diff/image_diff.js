import * as imageDiffHelper from './image_diff_helper';

export default class ImageDiff {
  constructor(el) {
    this.el = el;
    this.imageFrame = el.querySelector('.diff-viewer .image');
  }

  bindEvents() {
    this.el.addEventListener('click.imageDiff', ImageDiff.click);
    this.el.addEventListener('blur.imageDiff', ImageDiff.blur);
    this.el.addEventListener('renderBadges.imageDiff', ImageDiff.renderBadges);
    this.el.addEventListener('updateBadges.imageDiff', ImageDiff.updateBadges);
  }

  unbindEvents() {
    this.el.removeEventListener('click.imageDiff', ImageDiff.click);
    this.el.removeEventListener('blur.imageDiff', ImageDiff.blur);
    this.el.removeEventListener('renderBadges.imageDiff', ImageDiff.renderBadges);
    this.el.removeEventListener('updateBadges.imageDiff', ImageDiff.updateBadges);
  }

  static click(event) {
    const customEvent = event.detail;
    const selection = imageDiffHelper.getTargetSelection(customEvent);

    // showCommentIndicator
    const container = customEvent.currentTarget;
    const commentIndicator = container.querySelector('.comment-indicator');

    if (commentIndicator) {
      commentIndicator.style.left = `${selection.browser.x}px`;
      commentIndicator.style.top = `${selection.browser.y}px`;
    } else {
      const button = imageDiffHelper
        .addCommentIndicator(container, selection.browser);

      button.addEventListener('click', imageDiffHelper.commentIndicatorOnClick);
    }

    // setupCoordinatesData
    const el = customEvent.currentTarget;
    imageDiffHelper.setLineCodeCoordinates(el, selection.actual);
    imageDiffHelper.setPositionDataAttribute(el, selection.actual);
  }

  // TODO: Rename to something better?
  static blur(event) {
    const customEvent = event.detail;
    const diffViewerEl = customEvent.target.closest('.diff-viewer');
    const commentIndicator = diffViewerEl.querySelector('.comment-indicator');

    if (commentIndicator) {
      commentIndicator.remove();
    }
  }

  static renderBadges() {

  }

  static updateBadges() {

  }
}
