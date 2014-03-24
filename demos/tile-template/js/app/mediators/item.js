(function(global) {

	'use strict';

	var ItemMediator = function(target, dispatcher, tpl, parentTemplate, parentScope, partials, data) {

		this.data = null;

		dispatcher.dispatch('log', 'item template mediator created');

		target.innerHTML = partials['tile-item.tpl.html'];

		var template = tpl(target.firstChild);
		var scope = template.scope;


		scope.remove = function() {
			dispatcher.dispatch('remove', scope.item.id);
		};

		this.postConstruct = function() {
			scope.item = this.data;
			template.render();
			dispatcher.dispatch('log', 'item template mediator updated with data' + this.data.id);
		};

		this.dispose = function() {
			dispatcher.dispatch('log', 'item template mediator removed, id: ' + this.data.id);
			template.dispose();
			template = null;
		};

	};

	// export
	global.tile = global.tile || {};
	global.tile.ItemMediator = ItemMediator;

})(this);
