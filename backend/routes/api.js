const express = require('express');
const { homepage } = require('../actions/api/keysActions');
const router = express.Router();

const usersAction = require('../actions/api/usersActions')
const keysAction = require('../actions/api/keysActions')
const activeAction = require('../actions/api/activeActions')
const archivesAction = require('../actions/api/archivesActions')

router.get('/keys', keysAction.getAllKeys);//wyswietl
router.get('/keys/:id', keysAction.getKey);//wyswietl wybrane
router.post('/keys', keysAction.saveKey);//zapisz
router.put('/keys/:id', keysAction.updateKey);//edytuj
router.delete('/keys/:id', keysAction.deleteKey);//usun

router.get('/users', usersAction.getAllUsers);//wyswietl
router.get('/users/:id', usersAction.getUser);//wyswietl wybrane
router.post('/users', usersAction.saveUser);//zapisz
router.put('/users/:id', usersAction.updateUser);//edytuj
router.delete('/users/:id', usersAction.deleteUser);//usun

router.get('/active', activeAction.getAllActive);//wyswietl
router.get('/active/:id', activeAction.getActive);//wyswietl wybrane
router.post('/active', activeAction.saveActive);//zapisz
router.put('/active/:id', activeAction.updateActive);//edytuj
router.delete('/active/:id', activeAction.deleteActive);//usun

router.get('/archives', archivesAction.getAllArchives);//wyswietl
router.get('/archives/:id', archivesAction.getArchives);//wyswietl wybrane
router.post('/archives', archivesAction.saveArchives);//zapisz
router.delete('/archives/:id', archivesAction.deleteArchives);//usun

module.exports=router;