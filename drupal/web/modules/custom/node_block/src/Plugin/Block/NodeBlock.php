<?php

namespace Drupal\node_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityViewBuilderInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a block for nodes.
 *
 * @Block(
 *   id = "node_block",
 *   admin_label = @Translation("Node Block")
 * )
 */
class NodeBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The field manager interface.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface*/
  protected $entityManager;

  /**
   * The entity view build interface.
   *
   * @var \Drupal\Core\Entity\EntityViewBuilderInterface
   */
  protected $viewBuilder;

  /**
   * The view mode.
   *
   * @var string
   */
  protected $viewMode = 'block';

  /**
   * The node.
   *
   * @var \Drupal\node\Entity\NodeInterface
   */
  protected $node = NULL;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityFieldManagerInterface $entityManager, EntityViewBuilderInterface $viewBuilder, array $configuration, $plugin_id, $plugin_definition) {
    $this->entityManager = $entityManager;
    $this->viewBuilder = $viewBuilder;
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $entityManager = \Drupal::service('entity_field.manager');
    $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
    return new static($entityManager, $viewBuilder, $configuration, $plugin_id, $plugin_definition);
  }

  /**
   * Build the block.
   */
  public function build() {
    $request = \Drupal::request();
    $this->node = $request->attributes->get('node');
    if ($this->node) {
      if (!is_object($this->node)) {
        $this->node = Node::load($this->node);
      }
    }

    $build = [];
    if ($this->node) {
      $fields = $this->entityManager->getFieldDefinitions('node', $this->node->bundle());
      foreach ($fields as $name => $definition) {
        if (!$this->node->get($name)->isEmpty()) {
          $build[$name] = $this->viewBuilder->viewField($this->node->get($name), $this->viewMode);
        }
      }
    }

    return $build;
  }

  /**
   * Clear the default theme configuration.
   */
  public function defaultConfiguration() {
    return [
      'theme_suggestion' => '',
    ];
  }

  /**
   * Create the array of theme suggestions.
   */
  public function blockForm($form, FormStateInterface $form_state) {
    return [
      'theme_suggestion' => [
        '#type' => 'textfield',
        '#title' => $this->t('Theme Suggestion'),
        '#default_value' => $this->configuration['theme_suggestion'],
        '#description' => 'Creates a theme suggestion for block--node-block--&lt;theme suggestion&gt;.html.twig',
      ],
    ];
  }

  /**
   * Provide the theme suggestions.
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['theme_suggestion'] = $form_state->getValue('theme_suggestion');
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return Cache::mergeContexts([
      'url.path',
    ], parent::getCacheContexts());
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    if (!$this->node) {
      return parent::getCacheTags();
    }
    return Cache::mergeTags([
      'node:' . $this->node->id(),
    ], parent::getCacheTags());
  }

}
