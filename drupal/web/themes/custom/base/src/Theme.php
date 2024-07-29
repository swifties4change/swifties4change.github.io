<?php

namespace Drupal\base;

use Drupal\Core\Template\Attribute;

/**
 * {@inheritdoc}
 */
class Theme {

  /**
   * The theme instance.
   *
   * @var \Drupal\base\Theme
   */
  protected static $instance;

  /**
   * Get the instance of the theme.
   *
   * @return \Drupal\base\Theme
   *   Instance of the theme.
   */
  public static function getInstance() {
    if (!self::$instance) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Get wrapping classes for site.
   */
  public static function getSiteWrapClasses(&$vars) {
    $wrap = new Attribute();
    $wrap->addClass('site-wrap');

    if ($vars['is_front']) {
      $wrap->addClass('home-wrap');
    }
    $vars['wrap'] = $wrap;

  }

  /**
   * {@inheritdoc}
   */
  public static function getThemeSuggestionsForBlocks(array &$suggestions, array $vars) {
    if (isset($vars['elements']['content']['#block_content'])) {
      $suggestions[] = 'block__custom__' . $vars['elements']['content']['#block_content']->bundle();
    }
    if (isset($vars['elements']['content']['#form_id'])) {
      $suggestions[] = 'block__' . $vars['elements']['content']['#form_id'];
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getThemeSuggestionsForParagraphs(array &$suggestions, array $vars) {

  }

  /**
   * {@inheritdoc}
   */
  public static function preprocessBlock(array &$vars) {
    if (isset($vars['base_plugin_id'])) {
      $currentTheme = \Drupal::theme()->getActiveTheme()->getName();

      switch ($vars['base_plugin_id']) {
        // Adds javascript for managing alerts to any alert blocks.
        case 'block_content':
          /** @var \Drupal\block_content\Entity\BlockContent $block */
          $block = $vars['content']['#block_content'];
          // For all custom blocks support attached libraries.
          $vars['#attached']['library'][] = 'base/components/' . $block->bundle();
          $vars['#attached']['library'][] = $currentTheme . '/components/' . $block->bundle();
          switch ($block->bundle()) {
            case 'engagement_popup':
              $vars['attributes']['class'][] = 'engagement-popup';
              $vars['#cache']['max-age'] = 0;
              $vars['attributes']['data-engagement-popup'] = $block->uuid();
              $vars['attributes']['data-cookie-expiry'] = $block->get('field_cookie_expiry')->getString();
              $vars['attributes']['data-scroll-depth'] = $block->get('field_scroll_depth')->getString();
              $vars['attributes']['data-time-on-page'] = $block->get('field_time_on_page')->getString();
              break;
          }
          break;

        case 'node_block':
          $request = \Drupal::request();
          $breadcrumbManager = \Drupal::service('breadcrumb');
          $routeMatch = \Drupal::service('current_route_match');
          $vars['elements']['#breadcrumbs'] = $breadcrumbManager->build($routeMatch)->toRenderable();
          $vars['elements']['#page_title'] = \Drupal::service('title_resolver')->getTitle($request, $routeMatch->getRouteObject());
          break;

        case 'views_block':
          $vars['#attached']['library'][] = 'base/components/' . $vars['derivative_plugin_id'];
          $vars['#attached']['library'][] = $currentTheme . '/components/' . $vars['derivative_plugin_id'];
          break;

        default:
          $vars['#attached']['library'][] = 'base/components/' . $vars['base_plugin_id'];
          $vars['#attached']['library'][] = $currentTheme . '/components/' . $vars['base_plugin_id'];
          break;
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function preprocessParagraph(array &$vars) {
    $request = \Drupal::request();
    $breadcrumbManager = \Drupal::service('breadcrumb');
    $route_match = \Drupal::routeMatch();
    $vars['title'] = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());
    $vars['breadcrumbs'] = $breadcrumbManager->build($route_match)->toRenderable();

    $vars['#cache']['contexts'][] = 'url';
  }

}
