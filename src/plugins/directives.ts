export default {
  install: (app) => {
    app.directive('style', {
      beforeMount(el, binding) {
        Object.keys(binding.value).forEach((key) => {
          el.style[key] = binding.value[key]
        })
      }
    })
    app.directive('mtooltip', {
      beforeMount(el, binding) {
        const config = binding.value
        const tooltip = document.createElement('span')
        tooltip.className = 'tooltiptext'
        tooltip.innerHTML = config.html ? config.content : document.createTextNode(config.content).textContent
        el.classList.add('tooltip')
        el.appendChild(tooltip)

        let showTimeout, hideTimeout, isVisible = false

        const showTooltip = () => {
          console.log('showTooltip')
          clearTimeout(hideTimeout)
          showTimeout = setTimeout(() => {
            tooltip.style.visibility = 'visible'
            isVisible = true
          }, config.delay || 0)
        }

        const hideTooltip = () => {
          console.log('hideTooltip')
          clearTimeout(showTimeout)
          hideTimeout = setTimeout(() => {
            tooltip.style.visibility = 'hidden'
            isVisible = false
          }, config.delay || 0)
        }

        const removeEvents = () => {
          el.removeEventListener('mouseenter', showTooltip)
          el.removeEventListener('mouseleave', hideTooltip)
          el.removeEventListener('click', showTooltip)
          el.removeEventListener('focus', showTooltip)
          el.removeEventListener('blur', hideTooltip)
          el.removeEventListener('click', hideTooltip)
        }
        removeEvents()

        const events = config.trigger.split(' ')

        events.forEach(event => {
          switch (event) {
            case 'hover':
              el.addEventListener('mouseenter', showTooltip)
              el.addEventListener('mouseleave', hideTooltip)
              break
            case 'click':
              el.addEventListener('click', () => {
                if (isVisible) {
                  hideTooltip()
                } else {
                  showTooltip()
                }
              })
              document.addEventListener('click', (e) => {
                if (isVisible && e.target !== el) {
                  hideTooltip()
                }
              })
              break
            case 'focus':
              el.addEventListener('focus', showTooltip)
              el.addEventListener('blur', hideTooltip)
              break
          }
        })

        if (config.show !== undefined) {
          if (config.show) {
            showTooltip()
          } else {
            hideTooltip()
          }
        }
      }
    })

  }
}
