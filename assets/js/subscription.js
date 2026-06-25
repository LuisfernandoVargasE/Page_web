/**
 * Manejo de suscripciones por correo electrónico con el webhook de n8n
 */

(function () {
  'use strict';

  /**
   * Inicializa el formulario de suscripción y enlaza el envío al webhook.
   * Se ejecuta cuando el DOM está listo.
   */
  function initSubscription() {
    if (typeof N8N_CONFIG === 'undefined') {
      console.warn('n8n: No se encontró n8n-config.js');
      return;
    }

    const { webhookUrl } = N8N_CONFIG;

    if (!webhookUrl) {
      console.warn('n8n: Configura la URL del webhook en n8n-config.js');
      return;
    }

    const form = document.getElementById('subscription-form');
    const emailInput = document.getElementById('subscription-email');
    const feedbackEl = document.getElementById('subscription-feedback');
    const submitBtn = form ? form.querySelector('.fleft__btn') : null;

    if (!form || !emailInput || !feedbackEl) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      // Validación básica
      if (!isValidEmail(email)) {
        showFeedback(feedbackEl, 'Por favor ingresa un correo válido.', 'error');
        emailInput.focus();
        return;
      }

      setLoading(submitBtn, true);
      hideFeedback(feedbackEl);

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscriber_email: email,
            source: 'website-footer',
            page: 'Innova Tech',
          }),
        });

        if (!response.ok) {
          throw new Error('Webhook error: ' + response.status);
        }

        showFeedback(feedbackEl, '¡Te has suscrito correctamente! Revisa tu correo para continuar.', 'success');
        form.reset();
      } catch (error) {
        console.error('Error al enviar suscripción:', error);
        showFeedback(feedbackEl, 'No se pudo registrar tu correo. Inténtalo de nuevo más tarde.', 'error');
      } finally {
        setLoading(submitBtn, false);
      }
    });
  }

  /**
   * Valida formato de correo electrónico.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Muestra un mensaje de retroalimentación al usuario.
   * @param {HTMLElement} el
   * @param {string} message
   * @param {'success'|'error'} type
   */
  function showFeedback(el, message, type) {
    el.textContent = message;
    el.className = 'subscription-feedback subscription-feedback--' + type;
    el.setAttribute('aria-live', 'polite');
    el.style.display = 'block';
  }

  /**
   * Oculta el mensaje de retroalimentación.
   * @param {HTMLElement} el
   */
  function hideFeedback(el) {
    el.style.display = 'none';
    el.textContent = '';
  }

  /**
   * Activa o desactiva el estado de carga del botón.
   * @param {HTMLElement} btn
   * @param {boolean} loading
   */
  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Enviando...' : 'Suscríbete';
  }

  // Esperar al DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubscription);
  } else {
    initSubscription();
  }
})();
