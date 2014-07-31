var _ = require('underscore'),
    expect = require('chai').expect,
    StateManager = require('stateManager');

describe('State Manager', function () {

    beforeEach(function () {
        this.data = [
            {
                id: '1',
                name: 'a',
                foo: 'I',
                bar: {
                    foo: {
                        deep: 'deep value'
                    }
                }
            },
            {
                id: '2',
                name: 'b',
                foo: 'I'
            },
            {
                id: '3',
                name: 'c'
            }
        ];
        this.options = {
            id: 'id'
        };
        this.stateManager = new StateManager(this.data, this.options);
    });

    afterEach(function () {
        delete this.stateManager;
    });

    it('Should return all records', function () {
        expect(this.stateManager.getRecords()).to.have.length(3);
    });

    it('Should return a record by its id', function () {
        expect(this.stateManager.getRecord('1').name).to.equal('a');
        expect(this.stateManager.getRecord('2').name).to.equal('b');
        expect(this.stateManager.getRecord('3').name).to.equal('c');

        this.stateManager = new StateManager([
            {
                key: 'a',
                name: 'foo'
            },
            {
                key: 'b',
                name: 'bar'
            }
        ], {
            id: 'key'
        });

        expect(this.stateManager.getRecord('a').name).to.equal('foo');
        expect(this.stateManager.getRecord('b').name).to.equal('bar');
    });

    it('Should return a set of records by a given set of key value pairs', function () {
        var records = this.stateManager.findRecords({foo: 'I'});
        expect(records).to.have.length(2);
        expect(records[0].name).to.equal('a');
        expect(records[1].name).to.equal('b');
    });

    it('Should give a value for a given property name', function () {
        var record = this.stateManager.getRecord('1');
        expect(this.stateManager.getValue(record, 'name')).to.equal('a');
        expect(this.stateManager.getValue(record, 'bar.foo.deep')).to.equal('deep value');
    });

    it('Should set a value for a given property name', function () {
        var record = this.stateManager.getRecord('1');
        expect(this.stateManager.getValue(record, 'name')).to.equal('a');
        this.stateManager.setValue(record, 'name', 'aaa');
        expect(this.stateManager.getValue(record, 'name')).to.equal('aaa');

        // deep set
        expect(this.stateManager.getValue(record, 'bar.foo.deep')).to.equal('deep value');
        this.stateManager.setValue(record, 'bar.foo.deep', 'hello');
        expect(this.stateManager.getValue(record, 'bar.foo.deep')).to.equal('hello');

        // set a value on a property name that does not exist
        expect(this.stateManager.getValue(record, 'z')).to.be.null;
        this.stateManager.setValue(record, 'z', 'hello world');
        expect(this.stateManager.getValue(record, 'z')).to.be.equal('hello world');

        // set a deep value on a property name that does not exist
        expect(this.stateManager.getValue(record, 'm.n.o')).to.be.null;
        this.stateManager.setValue(record, 'm.n.o', 'world');
        expect(this.stateManager.getValue(record, 'm.n.o')).to.be.equal('world');

    });

    it('Should add record to record set', function () {
        expect(this.stateManager.getRecords()).to.have.length(3);
        var newRecord = this.stateManager.addRecord({name: 'new record 1'});
        expect(newRecord.id).to.equal('-1');
        expect(newRecord.name).to.equal('new record 1');
        expect(this.stateManager.getRecords()[3].id).to.equal('-1');

        newRecord = this.stateManager.addRecord({name: 'new record 2'}, 2);
        expect(newRecord.id).to.equal('-2');
        expect(newRecord.name).to.equal('new record 2');
        expect(this.stateManager.getRecords()[0].id).to.equal('1');
        expect(this.stateManager.getRecords()[1].id).to.equal('2');
        expect(this.stateManager.getRecords()[2].id).to.equal('-2');
        expect(this.stateManager.getRecords()[3].id).to.equal('3');
        expect(this.stateManager.getRecords()[4].id).to.equal('-1');

    });

    it('Should delete record from record set with a given id', function () {
        expect(this.stateManager.getRecords()).to.have.length(3);
        expect(this.stateManager.getRecords()[0].id).to.equal('1');
        expect(this.stateManager.getRecords()[1].id).to.equal('2');
        expect(this.stateManager.getRecords()[2].id).to.equal('3');
        this.stateManager.deleteRecord('2');
        expect(this.stateManager.getRecords()).to.have.length(2);
        expect(this.stateManager.getRecords()[0].id).to.equal('1');
        expect(this.stateManager.getRecords()[1].id).to.equal('3');
        this.stateManager.deleteRecord('1');
        expect(this.stateManager.getRecords()).to.have.length(1);
        expect(this.stateManager.getRecords()[0].id).to.equal('3');
        this.stateManager.deleteRecord('3');
        expect(this.stateManager.getRecords()).to.have.length(0);
    });

    it('Should return a set of attributes determining the state of the record', function () {
        var record = this.stateManager.getRecord('2');
        var attributes = this.stateManager.attributes(record);
        expect(_.keys(attributes)).to.have.length(2);
        expect(attributes.areEditableValues).to.have.length(0);
        expect(attributes.isNew).to.be.false;

        record.id = '-1';
        attributes = this.stateManager.attributes(record);
        expect(attributes.isNew).to.be.true;

    });
});
